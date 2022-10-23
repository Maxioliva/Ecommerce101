import config from './utils/config';
import app from './app';

(async () => {
  try {
    app.listen({ port: config.server.port });
    // eslint-disable-next-line no-undef
    console.log(`Server ready at http://localhost:${config.server.port} 🚀🚀🚀`);
  } catch (err) {
    // eslint-disable-next-line no-undef
    console.error(err);
  }
})();
