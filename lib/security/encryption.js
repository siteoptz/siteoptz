// lib/security/encryption.js
import crypto from 'crypto';

export class EncryptionService {
  constructor() {
    this.algorithm = 'aes-256-gcm';
    this.keyHex = process.env.ENCRYPTION_KEY;
    
    if (!this.keyHex) {
      throw new Error('ENCRYPTION_KEY environment variable is required');
    }
    
    // Ensure key is proper length for AES-256 (32 bytes = 64 hex chars)
    if (this.keyHex.length !== 64) {
      throw new Error('ENCRYPTION_KEY must be 64 hex characters (32 bytes)');
    }
    
    this.key = Buffer.from(this.keyHex, 'hex');
  }

  encrypt(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('Text to encrypt must be a non-empty string');
    }

    try {
      // Generate random initialization vector
      const iv = crypto.randomBytes(16);
      
      // Create cipher
      const cipher = crypto.createCipher(this.algorithm, this.key, iv);
      
      // Encrypt the text
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Get authentication tag
      const authTag = cipher.getAuthTag();
      
      return {
        encrypted,
        iv: iv.toString('hex'),
        authTag: authTag.toString('hex'),
        algorithm: this.algorithm
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${error.message}`);
    }
  }

  decrypt(encryptedData) {
    if (!encryptedData || typeof encryptedData !== 'object') {
      throw new Error('Encrypted data must be an object with encrypted, iv, and authTag properties');
    }

    const { encrypted, iv, authTag, algorithm } = encryptedData;

    if (!encrypted || !iv || !authTag) {
      throw new Error('Encrypted data is missing required properties');
    }

    if (algorithm && algorithm !== this.algorithm) {
      throw new Error(`Algorithm mismatch. Expected ${this.algorithm}, got ${algorithm}`);
    }

    try {
      // Create decipher
      const decipher = crypto.createDecipher(
        this.algorithm,
        this.key,
        Buffer.from(iv, 'hex')
      );
      
      // Set auth tag
      decipher.setAuthTag(Buffer.from(authTag, 'hex'));
      
      // Decrypt the text
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error.message}`);
    }
  }

  // Utility method to generate a new encryption key
  static generateKey() {
    return crypto.randomBytes(32).toString('hex');
  }

  // Hash passwords using bcrypt-compatible approach
  async hashPassword(password, saltRounds = 12) {
    const bcrypt = await import('bcrypt');
    return await bcrypt.hash(password, saltRounds);
  }

  // Verify password against hash
  async verifyPassword(password, hash) {
    const bcrypt = await import('bcrypt');
    return await bcrypt.compare(password, hash);
  }

  // Generate secure random tokens
  generateSecureToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Hash data using SHA-256
  hash(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  // Create HMAC signature
  createHMAC(data, secret = null) {
    const key = secret || this.key;
    return crypto.createHmac('sha256', key).update(data).digest('hex');
  }

  // Verify HMAC signature
  verifyHMAC(data, signature, secret = null) {
    const expectedSignature = this.createHMAC(data, secret);
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  }
}

export default EncryptionService;