import { useContractRead } from "@starknet-react/core";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import LabelComponent from "~/components/common/LabelComponent";
import { bigIntToNumber } from "~/utils/starknet";
import { DECIMALS } from "~/types/config";
import LoadingAndError from "~/components/common/LoadingAndError";

export default function TotalSale() {
    const { yielderAbi, yielderAddress } = useProjectAbis();
    const { data, error, isError, isLoading } = useContractRead({
        address: yielderAddress,
        abi: yielderAbi,
        functionName: 'get_total_sale'
    });

    const title = "Total sale";

    if (isLoading || isError || data === undefined || typeof data !== 'bigint') {
        return (
            <LoadingAndError
                title={title}
                isLoading={isLoading}
                isError={isError || (data === undefined || typeof data !== 'bigint')}
                error={error}
            />
        )
    }

    return (
        <LabelComponent
            title={title}
            value={`$${(bigIntToNumber(data) * Math.pow(10, -DECIMALS)).toString()}`}

        />
    )
}