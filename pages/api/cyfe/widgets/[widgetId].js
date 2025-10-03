import { CyfeAPIService } from '../../../../lib/cyfe-api-service';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]';

const cyfeService = new CyfeAPIService();

export default async function handler(req, res) {
  const { widgetId } = req.query;

  try {
    // Verify user authentication
    const session = await getServerSession(req, res, authOptions);
    
    if (!session) {
      console.log(`❌ Unauthorized access to widget ${widgetId}`);
      return res.status(401).json({ 
        error: 'Unauthorized', 
        message: 'Please sign in to access widget data' 
      });
    }

    console.log(`🔧 Widget ${widgetId} API called by: ${session.user.email} - Method: ${req.method}`);

    if (req.method === 'GET') {
      // Get specific widget data
      try {
        const widgetData = await cyfeService.getWidgetData(widgetId);
        
        // Add user access metadata
        const enhancedData = {
          ...widgetData,
          accessedBy: session.user.email,
          accessTime: new Date().toISOString(),
          dashboardUrl: `https://optz.siteoptz.ai/widget/${widgetId}`,
          embedUrl: `https://optz.siteoptz.ai/embed/widget/${widgetId}`
        };

        console.log(`✅ Returning widget data for ${widgetId} to ${session.user.email}`);
        res.status(200).json({
          success: true,
          data: enhancedData,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error(`❌ Error fetching widget ${widgetId}:`, error);
        res.status(500).json({ 
          error: 'Failed to fetch widget data', 
          message: error.message,
          widgetId: widgetId,
          timestamp: new Date().toISOString()
        });
      }
    } else if (req.method === 'POST') {
      // Push data to widget
      try {
        const data = req.body;
        
        // Add tracking metadata
        const enhancedData = {
          ...data,
          pushedBy: session.user.email,
          userId: session.user.id || session.user.email,
          source: 'siteoptz-dashboard',
          timestamp: new Date().toISOString()
        };

        const result = await cyfeService.pushDataToWidget(widgetId, enhancedData);
        
        console.log(`✅ Data pushed to widget ${widgetId} by ${session.user.email}`);
        res.status(200).json({
          success: true,
          data: result,
          message: 'Data pushed successfully',
          widgetId: widgetId,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error(`❌ Error pushing data to widget ${widgetId}:`, error);
        res.status(500).json({ 
          error: 'Failed to push data to widget', 
          message: error.message,
          widgetId: widgetId,
          timestamp: new Date().toISOString()
        });
      }
    } else if (req.method === 'PUT') {
      // Update widget configuration
      try {
        const updates = req.body;
        
        // Add user tracking
        updates.updatedBy = session.user.email;
        updates.updatedAt = new Date().toISOString();

        const updatedWidget = await cyfeService.updateWidget(widgetId, updates);
        
        console.log(`✅ Widget ${widgetId} updated by ${session.user.email}`);
        res.status(200).json({
          success: true,
          data: updatedWidget,
          message: 'Widget updated successfully',
          widgetId: widgetId,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error(`❌ Error updating widget ${widgetId}:`, error);
        res.status(500).json({ 
          error: 'Failed to update widget', 
          message: error.message,
          widgetId: widgetId,
          timestamp: new Date().toISOString()
        });
      }
    } else {
      console.log(`❌ Method ${req.method} not allowed for widget ${widgetId} API`);
      res.status(405).json({ 
        error: 'Method not allowed',
        allowedMethods: ['GET', 'POST', 'PUT'],
        widgetId: widgetId
      });
    }
  } catch (error) {
    console.error(`❌ Unexpected error in widget ${widgetId} API:`, error);
    res.status(500).json({ 
      error: 'Internal server error', 
      message: 'An unexpected error occurred',
      widgetId: widgetId,
      timestamp: new Date().toISOString()
    });
  }
}