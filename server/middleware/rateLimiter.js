const requests = new Map();

export const rateLimiter = (limit = 100, window = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!requests.has(ip)) {
      requests.set(ip, []);
    }

    const userRequests = requests.get(ip).filter(time => now - time < window);
    userRequests.push(now);
    requests.set(ip, userRequests);

    if (userRequests.length > limit) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests, please try again later'
      });
    }

    next();
  };
};
