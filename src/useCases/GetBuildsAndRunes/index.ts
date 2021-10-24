import { GetBuilsAndRunesUseCase } from "./GetBuildsAndRunesUseCase";
import { GetBuildsAndRunesController } from "./GetBuilsAndRunesController";

const getBuildsAndRunesUseCase = new GetBuilsAndRunesUseCase()
const getBuildsAndRunesController = new GetBuildsAndRunesController(getBuildsAndRunesUseCase)

export { getBuildsAndRunesController }