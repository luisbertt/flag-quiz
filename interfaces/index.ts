// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type Country = {
    name: string
    flag: string
    flags: Flags
    guessed?: boolean
}

export type Flags = {
    png: string
    svg: string
}
