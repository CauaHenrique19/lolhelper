import { GetCountersUseCase } from "./GetCountersUseCase";
import { GetCountersController } from "./GetCountersController";

const getCountersUseCase = new GetCountersUseCase()
const getCountersController = new GetCountersController(getCountersUseCase)

export { getCountersController }