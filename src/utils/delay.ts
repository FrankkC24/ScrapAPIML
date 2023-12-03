import { DelayFunction } from "../types/delay";

export const delay: DelayFunction = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
