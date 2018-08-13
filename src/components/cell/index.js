import { ValuesProvider, ValuesConsumer } from './context';
import withContext from '../withContext';
import Cell from './Cell';

const wrappedCell = withContext(Cell, ValuesConsumer);

export { default as CellItem } from './CellItem';
export { ValuesProvider, wrappedCell as Cell };
