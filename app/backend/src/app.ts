import 'express-async-errors';
import * as express from 'express';
import * as cors from 'cors';
import authRoute from './routes/auth.routes';
import teamRoute from './routes/team.routes';
import matchRoute from './routes/match.routes';
import leaderboardRoute from './routes/leaderboard.routes';
import errorMiddleware from './middlewares/error.middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
    this.app.use(cors());
    this.app.use('/login', authRoute);
    this.app.use('/teams', teamRoute);
    this.app.use('/leaderboard', leaderboardRoute);
    this.app.use('/matches', matchRoute);
    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
