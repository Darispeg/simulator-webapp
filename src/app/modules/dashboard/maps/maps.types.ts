import { Patrol } from "../patrols/patrols.model"

export interface MapSimulator {
    key? : string,
    name : string
    patrols : Patrol[]
}