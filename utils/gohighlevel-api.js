// GoHighLevel API Integration for SiteOptz.ai
// Complete implementation for adding subscribers to pipelines and workflows

const axios = require('axios');

class GoHighLevelAPI {
  constructor(apiKey, locationId) {
    this.apiKey = apiKey || process.env.GOHIGHLEVEL_API_KEY;
    this.locationId = locationId || process.env.GOHIGHLEVEL_LOCATION_ID;
    this.baseURL = 'https://services.leadconnectorhq.com';
    
    if (!this.apiKey) {
      throw new Error('GoHighLevel API key is required');
    }
    
    if (!this.locationId) {
      throw new Error('GoHighLevel Location ID is required');
    }
    
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28'
      },
      timeout: 10000 // 10 second timeout
    });
  }

  // Add subscriber to pipeline
  async addSubscriberToPipeline(pipelineId, subscriberData) {
    try {
      console.log(`Adding subscriber to pipeline ${pipelineId}:`, subscriberData);
      
      const response = await this.client.post(`/pipelines/${pipelineId}/subscribers`, {
        locationId: this.locationId,
        ...subscriberData
      });
      
      console.log('✅ Subscriber added to pipeline successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding subscriber to pipeline:', {
        pipelineId,
        error: error.response?.data || error.message,
        status: error.response?.status
      });
      throw error;
    }
  }

  // Add subscriber to workflow
  async addSubscriberToWorkflow(workflowId, subscriberData) {
    try {
      console.log(`Adding subscriber to workflow ${workflowId}:`, subscriberData);
      
      const response = await this.client.post(`/workflows/${workflowId}/subscribers`, {
        locationId: this.locationId,
        ...subscriberData
      });
      
      console.log('✅ Subscriber added to workflow successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding subscriber to workflow:', {
        workflowId,
        error: error.response?.data || error.message,
        status: error.response?.status
      });
      throw error;
    }
  }

  // Create or update contact
  async createOrUpdateContact(contactData) {
    try {
      console.log('Creating/updating contact:', contactData);
      
      const response = await this.client.post('/contacts/', {
        locationId: this.locationId,
        ...contactData
      });
      
      console.log('✅ Contact created/updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating/updating contact:', {
        error: error.response?.data || error.message,
        status: error.response?.status
      });
      throw error;
    }
  }

  // Get contact by email
  async getContactByEmail(email) {
    try {
      const response = await this.client.get('/contacts/', {
        params: {
          locationId: this.locationId,
          email: email
        }
      });
      
      return response.data.contacts?.[0] || null;
    } catch (error) {
      console.error('❌ Error getting contact by email:', error.message);
      return null;
    }
  }

  // Add contact to pipeline
  async addContactToPipeline(contactId, pipelineId, stageId = null) {
    try {
      console.log(`Adding contact ${contactId} to pipeline ${pipelineId}`);
      
      const response = await this.client.post(`/pipelines/${pipelineId}/subscribers`, {
        locationId: this.locationId,
        contactId: contactId,
        stageId: stageId
      });
      
      console.log('✅ Contact added to pipeline successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding contact to pipeline:', {
        contactId,
        pipelineId,
        error: error.response?.data || error.message
      });
      throw error;
    }
  }

  // Add contact to workflow
  async addContactToWorkflow(contactId, workflowId) {
    try {
      console.log(`Adding contact ${contactId} to workflow ${workflowId}`);
      
      const response = await this.client.post(`/workflows/${workflowId}/subscribers`, {
        locationId: this.locationId,
        contactId: contactId
      });
      
      console.log('✅ Contact added to workflow successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding contact to workflow:', {
        contactId,
        workflowId,
        error: error.response?.data || error.message
      });
      throw error;
    }
  }

  // Get pipelines
  async getPipelines() {
    try {
      const response = await this.client.get('/pipelines/', {
        params: {
          locationId: this.locationId
        }
      });
      
      return response.data.pipelines || [];
    } catch (error) {
      console.error('❌ Error getting pipelines:', error.message);
      return [];
    }
  }

  // Get workflows
  async getWorkflows() {
    try {
      const response = await this.client.get('/workflows/', {
        params: {
          locationId: this.locationId
        }
      });
      
      return response.data.workflows || [];
    } catch (error) {
      console.error('❌ Error getting workflows:', error.message);
      return [];
    }
  }

  // Add tags to contact
  async addTagsToContact(contactId, tags) {
    try {
      console.log(`Adding tags to contact ${contactId}:`, tags);
      
      const response = await this.client.post(`/contacts/${contactId}/tags`, {
        locationId: this.locationId,
        tags: tags
      });
      
      console.log('✅ Tags added to contact successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error adding tags to contact:', {
        contactId,
        tags,
        error: error.response?.data || error.message
      });
      throw error;
    }
  }

  // Update contact custom fields
  async updateContactCustomFields(contactId, customFields) {
    try {
      console.log(`Updating custom fields for contact ${contactId}:`, customFields);
      
      const response = await this.client.put(`/contacts/${contactId}`, {
        locationId: this.locationId,
        customFields: customFields
      });
      
      console.log('✅ Custom fields updated successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating custom fields:', {
        contactId,
        customFields,
        error: error.response?.data || error.message
      });
      throw error;
    }
  }
}

module.exports = GoHighLevelAPI;
