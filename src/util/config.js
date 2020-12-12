import YAML from 'yaml';
import fs from 'fs';

const file = fs.readFileSync('./config.yaml', 'utf8');

export const { webhook, skus, delay_time: delayTime } = YAML.parse(file);
