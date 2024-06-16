export const TODOS_NAV = {
    ALL: 'ALL',
    TODOS: 'TODOS',
    COMPLETED: 'COMPLETED'
} as const;

export const TODOS_VAN_LABEL = {
    [TODOS_NAV.ALL]: '전체',
    [TODOS_NAV.TODOS]: '할 일',
    [TODOS_NAV.COMPLETED]: '완료'
} as const;

export const TODOS_COUNT_KEY = {
    [TODOS_NAV.ALL]: 'total',
    [TODOS_NAV.TODOS]: 'todo',
    [TODOS_NAV.COMPLETED]: 'completed'
} as const;
