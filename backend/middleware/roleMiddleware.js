// middleware/roleMiddleware.js

// Middleware to restrict access based on roles
exports.requireRole = (role) => {
    return (req, res, next) => {
      if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: 'Forbidden: Insufficient role access' });
      }
      next();
    };
  };
  