import ApplicationError from '../errors/ApplicationError';
import authToken from '../utils/authToken.utils';

class AuthProtectedRoute {
  privateRouteMiddleware(req, res, next) {
    const token = req.get('Authorization');

    if (!token) {
      throw new ApplicationError({ message: 'Missing Credentials', type: 'Auth-Token-Not-Present', status: 401 });
    }

    const tokenWithoutBearer = token.split(' ')[1];

    let decodedToken;

    try {
      decodedToken = authToken.verify(tokenWithoutBearer);
    } catch (error) {
      throw new ApplicationError({ message: 'Token expired', type: 'Auth-Token-Expired', status: 401 });
    }

    req.user = { id: decodedToken.id, role: decodedToken.role };

    return next();
  }
}

export default new AuthProtectedRoute();