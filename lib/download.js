import {
  createRequire
} from 'module';
let require = createRequire(import.meta.url);
let {
  download
} = require('apk-dl')
let {
  ytmp4,
  ytmp3,
  ytmp3v2,
  ttdl,
  fbdl,
  igdl,
  ytsearch
} = require('@ruhend/scraper');
export {
  download,
  ytmp4,
  ytmp3,
  ytmp3v2,
  ttdl,
  fbdl,
  igdl,
  ytsearch
}