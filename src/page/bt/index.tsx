import Mysql from './Mysql'
import System from './system/Lists'
import SystemEdit from './system/actionEdit'
import Base from "./base"

export const mysql = Mysql;
export const system = { SystemEdit, System };
export const base = Base;