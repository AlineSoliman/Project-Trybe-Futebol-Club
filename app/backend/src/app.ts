import * as express from 'express';
import loginRoute from './routes/loginRoute';
import teamRoute from './routes/teamRoute';
import matchesRoute from './routes/matchesRoute';
import leaderboardRouter from './routes/leaderboarderRoute';

class App {
  public app: express.Express;
  public userController: unknown;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));

    this.app.use('/login', loginRoute);
    this.app.use('/login/validate', loginRoute);
    this.app.use('/teams', teamRoute);
    this.app.use('/matches', matchesRoute);
    this.app.use('/leaderboard', leaderboardRouter);
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
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
