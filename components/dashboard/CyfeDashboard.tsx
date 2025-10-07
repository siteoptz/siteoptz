import React, { useState, useEffect } from 'react';
import { UserPlan } from '../../utils/planAccessControl';
import { 
  CyfeIntegration, 
  CyfeDashboard as CyfeDashboardType,
  DASHBOARD_REGISTRY,
  getCyfeIntegration,
  getPlanDashboardLimits
} from '../../lib/cyfe-integration';
import { UpgradePrompt } from '../UpgradePrompt';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  AlertCircle,
  Lock,
  Unlock,
  Settings,
  RefreshCw,
  Maximize,
  ChevronRight,
  Check,
  X
} from 'lucide-react';

interface CyfeDashboardProps {
  userPlan: UserPlan;
  userName: string;
  dashboardId: string;
  apiData?: any;
}

export const CyfeDashboard: React.FC<CyfeDashboardProps> = ({
  userPlan,
  userName,
  dashboardId,
  apiData
}) => {
  const [cyfeIntegration] = useState(() => getCyfeIntegration(userPlan));
  const [selectedDashboard, setSelectedDashboard] = useState<string>(dashboardId);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  const dashboard = DASHBOARD_REGISTRY[selectedDashboard];
  const canAccess = cyfeIntegration.canAccessDashboard(selectedDashboard);
  const upgradeRequired = cyfeIntegration.getUpgradeRequirement(selectedDashboard);
  const accessibleDashboards = cyfeIntegration.getAccessibleDashboards();
  const planLimits = getPlanDashboardLimits(userPlan);

  useEffect(() => {
    if (canAccess) {
      const url = cyfeIntegration.generateEmbedUrl(selectedDashboard, {
        theme: 'dark',
        height: 600,
        refresh: planLimits.refreshRate
      });
      setEmbedUrl(url);
    }
  }, [selectedDashboard, canAccess, cyfeIntegration, planLimits.refreshRate]);

  const handleSyncData = async () => {
    if (!apiData || !canAccess) return;

    setIsLoading(true);
    setSyncStatus('syncing');

    try {
      const response = await fetch('/api/cyfe/sync-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dashboardId: selectedDashboard,
          data: apiData,
          userEmail: userName
        }),
      });

      if (response.ok) {
        setSyncStatus('success');
        setLastSyncTime(new Date().toLocaleString());
      } else {
        setSyncStatus('error');
      }
    } catch (error) {
      console.error('Error syncing to Cyfe:', error);
      setSyncStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Dashboard Selector */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Analytics Dashboards</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">
              {accessibleDashboards.length} of {Object.keys(DASHBOARD_REGISTRY).length} dashboards available
            </span>
            <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full">
              {userPlan.charAt(0).toUpperCase() + userPlan.slice(1)} Plan
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(DASHBOARD_REGISTRY).map(([key, dash]) => {
            const isAccessible = cyfeIntegration.canAccessDashboard(key);
            const isSelected = selectedDashboard === key;
            const requiredPlan = cyfeIntegration.getUpgradeRequirement(key);

            return (
              <div
                key={key}
                onClick={() => isAccessible && setSelectedDashboard(key)}
                className={`
                  relative bg-black border rounded-lg p-4 transition-all cursor-pointer
                  ${isSelected ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-gray-800'}
                  ${isAccessible ? 'hover:border-cyan-500/50' : 'opacity-50 cursor-not-allowed'}
                `}
              >
                {!isAccessible && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-4 h-4 text-gray-500" />
                  </div>
                )}
                {isAccessible && (
                  <div className="absolute top-2 right-2">
                    <Unlock className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
                
                <h3 className="font-semibold text-white mb-1">{dash.name}</h3>
                <p className="text-xs text-gray-400 mb-2">{dash.description}</p>
                
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isAccessible 
                      ? 'bg-green-900/50 text-green-400' 
                      : 'bg-amber-900/50 text-amber-400'
                  }`}>
                    {isAccessible ? 'Available' : `Requires ${requiredPlan}`}
                  </span>
                  <span className="text-xs text-gray-500">
                    {dash.widgets.length} widgets
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Dashboard Display */}
      {dashboard && (
        <div className="bg-black border border-gray-800 rounded-xl">
          {/* Dashboard Header */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">{dashboard.name}</h3>
                <p className="text-gray-400 mt-1">{dashboard.description}</p>
              </div>
              {canAccess && (
                <button
                  onClick={handleSyncData}
                  disabled={isLoading}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors
                    ${isLoading
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                    }
                  `}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                  <span>{isLoading ? 'Syncing...' : 'Sync Data'}</span>
                </button>
              )}
            </div>

            {/* Sync Status */}
            {syncStatus !== 'idle' && (
              <div className={`mt-4 p-3 rounded-lg border ${
                syncStatus === 'success' 
                  ? 'bg-green-900/20 border-green-600 text-green-200'
                  : syncStatus === 'error'
                  ? 'bg-red-900/20 border-red-600 text-red-200'
                  : 'bg-blue-900/20 border-blue-600 text-blue-200'
              }`}>
                {syncStatus === 'syncing' && 'Syncing data to Cyfe dashboard...'}
                {syncStatus === 'success' && `Successfully synced at ${lastSyncTime}`}
                {syncStatus === 'error' && 'Failed to sync data. Please try again.'}
              </div>
            )}
          </div>

          {/* Dashboard Content */}
          {canAccess ? (
            <div className="p-6">
              {/* Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                  Dashboard Features
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dashboard.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Embedded Dashboard */}
              {embedUrl && (
                <div className="relative bg-gray-900 rounded-lg overflow-hidden" style={{ height: '600px' }}>
                  <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="w-full h-full"
                    title={dashboard.name}
                  />
                  <button
                    className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors"
                    onClick={() => window.open(embedUrl, '_blank')}
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Widgets List */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                  Available Widgets ({cyfeIntegration.getAccessibleWidgets(selectedDashboard).length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cyfeIntegration.getAccessibleWidgets(selectedDashboard).map(widget => (
                    <div
                      key={widget.id}
                      className="bg-gray-900 border border-gray-800 rounded-lg p-3 flex items-center space-x-3"
                    >
                      {widget.type === 'chart' && <BarChart3 className="w-5 h-5 text-cyan-400" />}
                      {widget.type === 'metric' && <TrendingUp className="w-5 h-5 text-green-400" />}
                      {widget.type === 'table' && <Users className="w-5 h-5 text-purple-400" />}
                      {widget.type === 'gauge' && <DollarSign className="w-5 h-5 text-yellow-400" />}
                      {widget.type === 'map' && <AlertCircle className="w-5 h-5 text-red-400" />}
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium">{widget.title}</p>
                        <p className="text-xs text-gray-500">Refresh: {widget.refreshInterval}s</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Plan Limits */}
              <div className="mt-6 bg-gray-900 border border-gray-800 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-white mb-3">Your Plan Limits</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Max Dashboards</p>
                    <p className="text-lg font-semibold text-white">
                      {planLimits.maxDashboards === -1 ? 'Unlimited' : planLimits.maxDashboards}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Max Widgets</p>
                    <p className="text-lg font-semibold text-white">
                      {planLimits.maxWidgets === -1 ? 'Unlimited' : planLimits.maxWidgets}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Refresh Rate</p>
                    <p className="text-lg font-semibold text-white">{planLimits.refreshRate}s</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Custom Integrations</p>
                    <p className="text-lg font-semibold text-white">
                      {planLimits.customIntegrations ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">White Label</p>
                    <p className="text-lg font-semibold text-white">
                      {planLimits.whiteLabel ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">API Access</p>
                    <p className="text-lg font-semibold text-white">
                      {planLimits.apiAccess ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Upgrade Required */
            <div className="p-12 text-center">
              <Lock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">
                {dashboard.name} Requires {upgradeRequired} Plan
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Upgrade your plan to access this advanced dashboard and unlock powerful analytics features.
              </p>
              
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase">What you'll get:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto text-left">
                  {dashboard.features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-300">
                      <ChevronRight className="w-4 h-4 text-cyan-400 mr-2" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <UpgradePrompt
                currentPlan={userPlan}
                requiredPlan={upgradeRequired!}
                feature={`access to ${dashboard.name}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CyfeDashboard;