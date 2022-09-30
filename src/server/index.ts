import config from './utils/config';
import app from './app';

(async () => {
  try {
    app.listen({ port: config.server.port });
    console.log(`Server ready at http://localhost:${config.server.port} 🚀🚀🚀`);
  } catch (err) {
    console.error(err);
  }
})();
