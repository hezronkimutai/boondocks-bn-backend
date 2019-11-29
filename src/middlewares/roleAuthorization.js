import Responses from '../utils/response';

const roleAuthorization = {
  checkIsSuperAdministrator(req, res, next) {
    const { role } = res.locals.user;
    if (role === 'super_administrator') {
      next();
    } else {
      return Responses.handleError(403, 'insufficient privileges', res);
    }
  },

  checkIsManager(req, res, next) {
    const { role } = res.locals.user;
    if (role !== 'manager') {
      return Responses.handleError(403, 'insufficient privileges', res);
    }
    next();
  }
};
export default roleAuthorization;
