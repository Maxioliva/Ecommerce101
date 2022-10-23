import config from './utils/config';
import app from './app';

(async () => {
  try {
    await app.listen({ port: config.server.port || 4420 });
    console.log(`Server ready at http://localhost:${config.server.port || 4420} 🚀🚀🚀`);
  } catch (err) {
    console.error(err);
  }
})();
