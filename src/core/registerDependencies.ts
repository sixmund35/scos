import { Container, type ServiceIdentifier } from 'inversify';
import { Repository } from './repository';

export const container = new Container();

export const registerDependencies = async (): Promise<void> => {
  const repository = new Repository();
  await repository.onModuleInit();

  container.bind(Repository).toSelf().inSingletonScope();
};

export const resolveDependency = (identifier: ServiceIdentifier) => {
  const deps = container.get(identifier, { autobind: true });
  return deps;
};
