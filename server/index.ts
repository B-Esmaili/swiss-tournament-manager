import fastify, { FastifyInstance } from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http'
import Next from 'next';
const port = parseInt(process.env.PORT ?? "", 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({});

server.register((fs, _, next) => {
  const app = Next({ dev })
  const handle = app.getRequestHandler()
  try {
    app.prepare();

    if (dev) {
      fs.get('/_next/*', (req, reply) => {
        return handle(req.raw, reply.raw).then(() => {
          reply.sent = true
        })
      })
    }

    fs.all('/*', (req, reply) => {
      return handle(req.raw, reply.raw).then(() => {
        reply.sent = true
      })
    });   

    fs.setNotFoundHandler((request, reply) => {
      return app.render404(request.req, reply.raw).then(() => {
        reply.sent = true
      })
    });

    next();
  } catch (err) {
    next(err);
  };
});

server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})