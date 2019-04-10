const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

const utils = require('../common/utils');
const mongodb = require('../database').mongodb;

const DATABASE_OF_CMS = 'cms';
const BACKUPDIRNAME_OF_CMS = path.join(__dirname, `../../backup/${DATABASE_OF_CMS}`);

class BackupService {
  async downloadDataOfCms () {
    const zipName = `${moment().format('YYYYMMDD')}.zip`;
    const outputPath = `${BACKUPDIRNAME_OF_CMS}/${zipName}`;
    const collections = await mongodb[DATABASE_OF_CMS].collections();
    const collectionNames = collections.map(collection => collection.s.name);
    try {
      await fs.emptyDir(BACKUPDIRNAME_OF_CMS);
      await Promise.all(collectionNames.map(async collection => {
        let list = await mongodb[DATABASE_OF_CMS].collection(collection).find().toArray();
        await fs.writeJson(`${BACKUPDIRNAME_OF_CMS}/${collection}.json`, list);
      }));
      await utils.zipFolder(BACKUPDIRNAME_OF_CMS, outputPath);
    } catch (err) {
      console.log(err);
    }
    return { name: zipName, path: outputPath };
  }
}

module.exports = new BackupService();
