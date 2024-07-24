import type { IInvestor } from '../interfaces/investor.interface';

export const transformToAdjacentGraphAlgo = (
    investors: IInvestor[],
): Record<number, IInvestor[]> => {
    const adjacencyList: Record<number, IInvestor[]> = {};
    const companyIdMap: Record<string, number> = {};

    investors.forEach((investor) => {
        if (investor.type === 'company') {
            if (companyIdMap[investor.code] === undefined) {
                companyIdMap[investor.code] = investor.id;
            } else {
                investor.id = companyIdMap[investor.code];
            }
        }

        const parentId = investor.parentInvestorId ?? 0;
        if (!adjacencyList[parentId]) {
            adjacencyList[parentId] = [];
        }
        adjacencyList[parentId].push(investor);
    });

    return adjacencyList;
};

export const calculateRealOwnersSharesAlgo = (
    adjacencyList: Record<number, IInvestor[]>,
    rootInvestors: IInvestor[],
): Record<string, number> => {
    const results: Record<string, number> = {};

    function dfs(investor: IInvestor, accumulatedShare: number) {
        const currentShare =
            (investor.sharePercentage * accumulatedShare) / 100;

        if (investor.type === 'person') {
            if (!results[investor.code]) {
                results[investor.code] = 0;
            }
            results[investor.code] += currentShare;
        }

        const subInvestors = adjacencyList[investor.id] ?? [];
        subInvestors.forEach((subInvestor) => {
            dfs(subInvestor, currentShare);
        });
    }

    rootInvestors.forEach((investor) => {
        dfs(investor, 100);
    });

    return results;
};
