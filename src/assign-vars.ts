import { Answers, Contract } from './types.js';

export const fulfillVarsContract = <Conditions extends Contract>(
    contract: Conditions,
    answers: Answers<Conditions>
): string =>
    (Object.keys(answers) as (keyof typeof answers)[])
        .map(answerName => {
            if (!(answerName in contract)) {
                console.warn(
                    `${answerName.toString()} not found in ${contract}`
                );
                return '';
            }

            const answer = answers[answerName];
            const condition = contract[answerName] ?? undefined;

            // non-existent contract key
            if (condition === undefined) {
                console.error(
                    `ERROR @assignVars: ${answerName.toString()} does not exist on criteria ${contract}`
                );
                return '';
            }

            // primitive value
            if (typeof condition === 'string') {
                if (typeof answer === 'string' || typeof answer === 'number') {
                    return `${condition}:${answer};`;
                }
                console.error(
                    `ERROR @assignVars: ${answer} is not a string or number, but the criteria ${contract} expects one.`
                );
                return '';
            }

            if (typeof condition === 'object') {
                if (typeof answer === 'object') {
                    if (answer === null) {
                        console.error(
                            `ERROR @assignVars: Cannot assign null as a cssVar value. Contract: ${contract}.`
                        );
                        return '';
                    }
                    return fulfillVarsContract(condition, answer);
                }
                console.error(
                    `ERROR @assignVars: Primitive answer provided for a condition node.\nCondition: ${condition}.\n Answer:${answer}`
                );
                return '';
            }

            console.error(
                `ERROR @assignVars: Unexpected error.\nCondition: ${condition}.\nAnswer: ${answer}`
            );
            return '';
        })
        .join('');
