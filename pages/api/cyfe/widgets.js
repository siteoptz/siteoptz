import { CyfeAPIService } from '../../../lib/cyfe-api-service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

const cyfeService = new CyfeAPIService();

export default async function handler(req, res) {
  try {
    // Verify user authentication
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      console.log('❌ Unauthorized access to widgets API');
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Please sign in to access widgets' 
      });
    }

    console.log(`🔧 Widgets API called by: ${session.user.email} - Method: ${req.method}`);

    if (req.method === 'GET') {
      // Get all widgets
      try {
        const widgets = await cyfeService.getAllWidgets();
        
        // Add metadata for UI
        const enhancedWidgets = widgets.map(widget => ({
          ...widget,
          status: widget.status || 'active',
          lastUpdated: widget.lastUpdated || new Date().toISOString(),
          canAccess: true,
          dashboardUrl: `https://siteoptz.ai/widget/${widget.id}`
        }));

        console.log(`✅ Returning ${enhancedWidgets.length} widgets to ${session.user.email}`);
        res.status(200).json({
          success: true,
          data: enhancedWidgets,
          count: enhancedWidgets.length,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('❌ Error fetching widgets:', error);
        res.status(500).json({ 
          error: 'Failed to fetch widgets', 
          message: error.message,
          timestamp: new Date().toISOString()
        });
      }
    } else if (req.method === 'POST') {
      // Create new widget
      try {
        const widgetConfig = req.body;
        
        // Add user context
        widgetConfig.createdBy = session.user.email;
        widgetConfig.userId = session.user.id || session.user.email;
        
        const newWidget = await cyfeService.createWidget(widgetConfig);
        
        console.log(`✅ Created new widget: ${newWidget.id} for ${session.user.email}`);
        res.status(201).json({
          success: true,
          data: newWidget,
          message: 'Widget created successfully',
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('❌ Error creating widget:', error);
        res.status(500).json({ 
          error: 'Failed to create widget', 
          message: error.message,
          timestamp: new Date().toISOString()
        });
      }
    } else {
      console.log(`❌ Method ${req.method} not allowed for widgets API`);
      res.status(405).json({ 
        error: 'Method not allowed',
        allowedMethods: ['GET', 'POST']
      });
    }
  } catch (error) {
    console.error('❌ Unexpected error in widgets API:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    });
  }
}