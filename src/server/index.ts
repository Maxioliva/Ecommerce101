import config from './utils/config';
import app from './app';

// eslint-disable-next-line consistent-return
(async () => {
  try {
    const server = await app.listen({ port: config.server.port || 4420 });
    console.log(`Server ready at http://localhost:${config.server.port || 4420} 🚀🚀🚀`);
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
      });
    });
  } catch (err) {
    console.error(err);
  }
})();
