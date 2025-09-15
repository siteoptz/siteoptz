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
      timeout: 15000 // 15 second timeout for better reliability
    });
    
    console.log('🔧 GoHighLevel API initialized:');
    console.log('- Base URL:', this.baseURL);
    console.log('- Location ID:', this.locationId);
    console.log('- API Key present:', !!this.apiKey);
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
      console.log('🔍 Creating/updating contact for Location ID:', this.locationId);
      console.log('📋 Contact data:', JSON.stringify(contactData, null, 2));
      
      // Format the data according to GoHighLevel v2 API requirements
      const payload = {
        locationId: this.locationId,
        firstName: contactData.firstName || contactData.first_name || '',
        lastName: contactData.lastName || contactData.last_name || '',
        email: contactData.email,
        phone: contactData.phone || '',
        source: contactData.source || 'API',
        tags: contactData.tags || []
      };
      
      // Convert customFields object to array format required by GoHighLevel API
      if (contactData.customFields && typeof contactData.customFields === 'object') {
        payload.customFields = [];
        for (const [key, value] of Object.entries(contactData.customFields)) {
          payload.customFields.push({
            key: key,
            field_value: String(value)
          });
        }
      } else if (Array.isArray(contactData.customFields)) {
        payload.customFields = contactData.customFields;
      } else {
        payload.customFields = [];
      }
      
      console.log('🚀 Sending to GoHighLevel API:', JSON.stringify(payload, null, 2));
      
      const response = await this.client.post('/contacts/', payload);
      
      console.log('✅ Contact created/updated successfully!');
      console.log('📄 Response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      // Handle duplicate contact error gracefully
      if (error.response?.status === 400 && 
          error.response?.data?.message?.includes('duplicated contacts') &&
          error.response?.data?.meta?.contactId) {
        
        const existingContactId = error.response.data.meta.contactId;
        console.log('📧 Contact already exists, updating existing contact ID:', existingContactId);
        
        try {
          // Update the existing contact instead
          const updateResponse = await this.client.put(`/contacts/${existingContactId}`, {
            locationId: this.locationId,
            firstName: payload.firstName,
            lastName: payload.lastName,
            phone: payload.phone,
            source: payload.source,
            customFields: payload.customFields
          });
          
          console.log('✅ Existing contact updated successfully!');
          console.log('📄 Update Response:', JSON.stringify(updateResponse.data, null, 2));
          return updateResponse.data;
        } catch (updateError) {
          console.error('❌ Failed to update existing contact:', updateError.message);
          // Return a mock response with the existing contact ID so the process continues
          return {
            contact: {
              id: existingContactId,
              email: contactData.email,
              firstName: contactData.firstName || contactData.first_name || '',
              lastName: contactData.lastName || contactData.last_name || ''
            }
          };
        }
      }
      
      console.error('❌ Error creating/updating contact:');
      console.error('Status:', error.response?.status);
      console.error('Status Text:', error.response?.statusText);
      console.error('Data:', error.response?.data);
      console.error('Message:', error.message);
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
