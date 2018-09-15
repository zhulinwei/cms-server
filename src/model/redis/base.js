class BaseModel {
  async get(key) {
    return await this.client.get(key); 
  }

  async set(key, value) {
    return await this.client.set(key, value);
  }
  
  async setex(key, expire, value) {
    return await this.client.set(key, value, 'EX', expire);
  }


}

module.exports = BaseModel;
