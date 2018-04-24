import config from '../config';
import AwsAuthService from './lambda/authService';
import ExpressAuthService from './express/authService';

let authService = null;

if (config.aws) {
    authService = new AwsAuthService();
} else {
    authService = new ExpressAuthService();
}

export default authService;