import { useContractRead } from "@starknet-react/core";
import { num, getChecksumAddress } from "starknet";
import { useProjectAbis } from "../../ProjectAbisWrapper";
import { useConfig } from "~/root";
import { ContractLinkComponent } from "~/components/common/LinkComponent";

export default function CertifierAccount() {
    const { projectAbi, projectAddress, slot } = useProjectAbis();
    const { voyagerContractURL } = useConfig();

    const { data, error } = useContractRead({
        address: projectAddress,
        abi: projectAbi,
        functionName: 'get_certifier',
        args: [slot]
    });

    if (error) {
        return (
            <div>Error loading project certifier account...</div>
        )
    }

    if (data === undefined || typeof data !== 'bigint') {
        return (
            <div>Certifier account is undefined...</div>
        )
    }

    return (
        <ContractLinkComponent
            title="Certifier account"
            address={getChecksumAddress(num.toHex(data))}
            href={voyagerContractURL + getChecksumAddress(num.toHex(data))}
        />
    )
}