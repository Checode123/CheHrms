import jwt from 'jsonwebtoken';

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access Denied. Role not authorized." });
      }

      req.user = decoded; // attach user data (id, role, etc.) to request
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token", error: err.message });
    }
  };
};
