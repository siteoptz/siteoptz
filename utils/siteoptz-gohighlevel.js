// SiteOptz.ai GoHighLevel Integration
// Specialized implementation for AI tool implementation and consulting business

const GoHighLevelAPI = require('./gohighlevel-api');

class SiteOptzGoHighLevel {
  constructor(apiKey, locationId) {
    this.api = new GoHighLevelAPI(apiKey, locationId);
    
    // Define your pipeline IDs - Replace with your actual pipeline IDs
    this.pipelines = {
      freeTrial: process.env.GHL_FREE_TRIAL_PIPELINE_ID || 'your_free_trial_pipeline_id',
      starterPlan: process.env.GHL_STARTER_PIPELINE_ID || 'your_starter_pipeline_id',
      proPlan: process.env.GHL_PRO_PIPELINE_ID || 'your_pro_pipeline_id',
      enterprisePlan: process.env.GHL_ENTERPRISE_PIPELINE_ID || 'your_enterprise_pipeline_id',
      emailCapture: process.env.GHL_EMAIL_CAPTURE_PIPELINE_ID || 'your_email_capture_pipeline_id',
      webinarRegistration: process.env.GHL_WEBINAR_PIPELINE_ID || 'your_webinar_pipeline_id'
    };
    
    // Define your workflow IDs - Replace with your actual workflow IDs
    this.workflows = {
      emailCapture: process.env.GHL_EMAIL_CAPTURE_WORKFLOW_ID || 'your_email_capture_workflow_id',
      implementationGuide: process.env.GHL_IMPLEMENTATION_WORKFLOW_ID || 'your_implementation_workflow_id',
      consultingScheduler: process.env.GHL_CONSULTING_WORKFLOW_ID || 'your_consulting_workflow_id',
      webinarFollowUp: process.env.GHL_WEBINAR_FOLLOWUP_WORKFLOW_ID || 'your_webinar_followup_workflow_id',
      onboarding: process.env.GHL_ONBOARDING_WORKFLOW_ID || 'your_onboarding_workflow_id'
    };
  }

  // Add free trial subscriber
  async addFreeTrialSubscriber(subscriberData) {
    const enhancedData = {
      email: subscriberData.email,
      firstName: subscriberData.firstName || subscriberData.first_name,
      lastName: subscriberData.lastName || subscriberData.last_name,
      phone: subscriberData.phone || '',
      source: subscriberData.source || 'website',
      customFields: {
        plan_type: 'free',
        ai_tools_interest: subscriberData.aiToolsInterest || subscriberData.ai_tools_interest || 'general',
        business_size: subscriberData.businessSize || subscriberData.business_size || 'unknown',
        implementation_priority: subscriberData.implementationPriority || subscriberData.implementation_priority || 'low',
        current_ai_tools: subscriberData.currentTools || subscriberData.current_tools || 'none',
        signup_date: new Date().toISOString(),
        lead_score: '10'
      }
    };

    const tags = ['free-trial', 'ai-tools', 'new-subscriber', 'website-signup'];

    try {
      // First create or update the contact
      const contact = await this.api.createOrUpdateContact(enhancedData);
      
      // Add tags to contact
      await this.api.addTagsToContact(contact.id, tags);
      
      // Add to free trial pipeline
      const pipelineResult = await this.api.addContactToPipeline(
        contact.id, 
        this.pipelines.freeTrial
      );
      
      // Add to email capture workflow
      await this.api.addContactToWorkflow(
        contact.id, 
        this.workflows.emailCapture
      );

      return {
        success: true,
        contact: contact,
        pipeline: pipelineResult,
        tags: tags
      };
    } catch (error) {
      console.error('Error adding free trial subscriber:', error);
      throw error;
    }
  }

  // Add starter plan subscriber
  async addStarterPlanSubscriber(subscriberData) {
    const enhancedData = {
      email: subscriberData.email,
      firstName: subscriberData.firstName || subscriberData.first_name,
      lastName: subscriberData.lastName || subscriberData.last_name,
      phone: subscriberData.phone || '',
      source: subscriberData.source || 'website',
      customFields: {
        plan_type: 'starter',
        implementation_priority: subscriberData.implementationPriority || subscriberData.implementation_priority || 'medium',
        team_size: subscriberData.teamSize || subscriberData.team_size || 'unknown',
        current_ai_tools: subscriberData.currentTools || subscriberData.current_tools || 'none',
        budget_range: subscriberData.budget || subscriberData.budget_range || 'unknown',
        implementation_timeline: subscriberData.timeline || subscriberData.implementation_timeline || '3-months',
        signup_date: new Date().toISOString(),
        lead_score: '25'
      }
    };

    const tags = ['starter-plan', 'ai-implementation', 'paying-customer', 'medium-priority'];

    try {
      const contact = await this.api.createOrUpdateContact(enhancedData);
      await this.api.addTagsToContact(contact.id, tags);
      
      const pipelineResult = await this.api.addContactToPipeline(
        contact.id, 
        this.pipelines.starterPlan
      );
      
      await this.api.addContactToWorkflow(
        contact.id, 
        this.workflows.implementationGuide
      );

      return {
        success: true,
        contact: contact,
        pipeline: pipelineResult,
        tags: tags
      };
    } catch (error) {
      console.error('Error adding starter plan subscriber:', error);
      throw error;
    }
  }

  // Add pro plan subscriber
  async addProPlanSubscriber(subscriberData) {
    const enhancedData = {
      email: subscriberData.email,
      firstName: subscriberData.firstName || subscriberData.first_name,
      lastName: subscriberData.lastName || subscriberData.last_name,
      phone: subscriberData.phone || '',
      source: subscriberData.source || 'website',
      customFields: {
        plan_type: 'pro',
        consulting_hours: subscriberData.consultingHours || subscriberData.consulting_hours || 4,
        implementation_timeline: subscriberData.timeline || subscriberData.implementation_timeline || '3-months',
        budget_range: subscriberData.budget || subscriberData.budget_range || 'unknown',
        team_size: subscriberData.teamSize || subscriberData.team_size || 'unknown',
        current_ai_tools: subscriberData.currentTools || subscriberData.current_tools || 'none',
        implementation_scope: subscriberData.scope || subscriberData.implementation_scope || 'full',
        signup_date: new Date().toISOString(),
        lead_score: '50'
      }
    };

    const tags = ['pro-plan', 'ai-consulting', 'enterprise-customer', 'high-priority'];

    try {
      const contact = await this.api.createOrUpdateContact(enhancedData);
      await this.api.addTagsToContact(contact.id, tags);
      
      const pipelineResult = await this.api.addContactToPipeline(
        contact.id, 
        this.pipelines.proPlan
      );
      
      await this.api.addContactToWorkflow(
        contact.id, 
        this.workflows.consultingScheduler
      );

      return {
        success: true,
        contact: contact,
        pipeline: pipelineResult,
        tags: tags
      };
    } catch (error) {
      console.error('Error adding pro plan subscriber:', error);
      throw error;
    }
  }

  // Add enterprise subscriber
  async addEnterpriseSubscriber(subscriberData) {
    const enhancedData = {
      email: subscriberData.email,
      firstName: subscriberData.firstName || subscriberData.first_name,
      lastName: subscriberData.lastName || subscriberData.last_name,
      phone: subscriberData.phone || '',
      source: subscriberData.source || 'website',
      customFields: {
        plan_type: 'enterprise',
        company_size: subscriberData.companySize || subscriberData.company_size || 'unknown',
        implementation_scope: subscriberData.scope || subscriberData.implementation_scope || 'full-transformation',
        decision_makers: subscriberData.decisionMakers || subscriberData.decision_makers || 'unknown',
        budget_range: subscriberData.budget || subscriberData.budget_range || 'enterprise',
        implementation_timeline: subscriberData.timeline || subscriberData.implementation_timeline || '6-months',
        current_ai_tools: subscriberData.currentTools || subscriberData.current_tools || 'none',
        signup_date: new Date().toISOString(),
        lead_score: '100'
      }
    };

    const tags = ['enterprise-plan', 'ai-transformation', 'high-value-customer', 'critical-priority'];

    try {
      const contact = await this.api.createOrUpdateContact(enhancedData);
      await this.api.addTagsToContact(contact.id, tags);
      
      const pipelineResult = await this.api.addContactToPipeline(
        contact.id, 
        this.pipelines.enterprisePlan
      );
      
      await this.api.addContactToWorkflow(
        contact.id, 
        this.workflows.consultingScheduler
      );

      return {
        success: true,
        contact: contact,
        pipeline: pipelineResult,
        tags: tags
      };
    } catch (error) {
      console.error('Error adding enterprise subscriber:', error);
      throw error;
    }
  }

  // Add webinar registrant
  async addWebinarRegistrant(subscriberData) {
    const enhancedData = {
      email: subscriberData.email,
      firstName: subscriberData.firstName || subscriberData.first_name,
      lastName: subscriberData.lastName || subscriberData.last_name,
      phone: subscriberData.phone || '',
      source: subscriberData.source || 'webinar',
      customFields: {
        webinar_title: subscriberData.webinarTitle || subscriberData.webinar_title || 'AI Tools Masterclass',
        webinar_date: subscriberData.webinarDate || subscriberData.webinar_date || '',
        webinar_time: subscriberData.webinarTime || subscriberData.webinar_time || '',
        company: subscriberData.company || '',
        role: subscriberData.role || '',
        experience: subscriberData.experience || 'beginner',
        interests: subscriberData.interests || subscriberData.interests || 'ai-tools',
        signup_date: new Date().toISOString(),
        lead_score: '15'
      }
    };

    const tags = ['webinar-registrant', 'ai-tools', 'new-subscriber', 'webinar-signup'];

    try {
      const contact = await this.api.createOrUpdateContact(enhancedData);
      await this.api.addTagsToContact(contact.id, tags);
      
      const pipelineResult = await this.api.addContactToPipeline(
        contact.id, 
        this.pipelines.webinarRegistration
      );
      
      await this.api.addContactToWorkflow(
        contact.id, 
        this.workflows.webinarFollowUp
      );

      return {
        success: true,
        contact: contact,
        pipeline: pipelineResult,
        tags: tags
      };
    } catch (error) {
      console.error('Error adding webinar registrant:', error);
      throw error;
    }
  }

  // Add subscriber to email capture workflow
  async addToEmailCaptureWorkflow(subscriberData) {
    try {
      const contact = await this.api.createOrUpdateContact({
        email: subscriberData.email,
        firstName: subscriberData.firstName || subscriberData.first_name,
        lastName: subscriberData.lastName || subscriberData.last_name,
        phone: subscriberData.phone || '',
        source: subscriberData.source || 'email-capture'
      });

      return await this.api.addContactToWorkflow(
        contact.id, 
        this.workflows.emailCapture
      );
    } catch (error) {
      console.error('Error adding to email capture workflow:', error);
      throw error;
    }
  }

  // Add subscriber to implementation guide workflow
  async addToImplementationWorkflow(subscriberData) {
    try {
      const contact = await this.api.createOrUpdateContact({
        email: subscriberData.email,
        firstName: subscriberData.firstName || subscriberData.first_name,
        lastName: subscriberData.lastName || subscriberData.last_name,
        phone: subscriberData.phone || '',
        source: subscriberData.source || 'implementation-guide'
      });

      return await this.api.addContactToWorkflow(
        contact.id, 
        this.workflows.implementationGuide
      );
    } catch (error) {
      console.error('Error adding to implementation workflow:', error);
      throw error;
    }
  }

  // Add subscriber to onboarding workflow
  async addToOnboardingWorkflow(subscriberData) {
    try {
      const contact = await this.api.createOrUpdateContact({
        email: subscriberData.email,
        firstName: subscriberData.firstName || subscriberData.first_name,
        lastName: subscriberData.lastName || subscriberData.last_name,
        phone: subscriberData.phone || '',
        source: subscriberData.source || 'onboarding'
      });

      return await this.api.addContactToWorkflow(
        contact.id, 
        this.workflows.onboarding
      );
    } catch (error) {
      console.error('Error adding to onboarding workflow:', error);
      throw error;
    }
  }

  // Get all pipelines (for debugging)
  async getPipelines() {
    return await this.api.getPipelines();
  }

  // Get all workflows (for debugging)
  async getWorkflows() {
    return await this.api.getWorkflows();
  }

  // Update contact with additional data
  async updateContact(contactId, additionalData) {
    try {
      return await this.api.updateContactCustomFields(contactId, additionalData);
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  }

  // Add tags to existing contact
  async addTagsToContact(contactId, tags) {
    try {
      return await this.api.addTagsToContact(contactId, tags);
    } catch (error) {
      console.error('Error adding tags to contact:', error);
      throw error;
    }
  }
}

module.exports = SiteOptzGoHighLevel;
