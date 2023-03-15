import { Patrol } from "../patrols/patrols.model"

export interface Map {
    key? : string,
    name : string
    patrols : Patrol[]
}