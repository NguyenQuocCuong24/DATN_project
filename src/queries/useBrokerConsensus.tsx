import { brokerConsensusManageApiRequest } from "@/apiRequests/broker-consensus";
import { KEY_QUERIES } from "@/constants/key-queries.const";
import { searchParamsBrokerConsensus } from "@/types/brokerConsensus.type";
import { useQuery } from "@tanstack/react-query";

export const useGetBrokerConsensusQuery = (
  start: number,
  end: number,
  params: searchParamsBrokerConsensus,
  enable?: boolean
) => {
  return useQuery({
    queryKey: [KEY_QUERIES.BROKER_CONSENSUS, start, end, params],
    queryFn: () =>
      brokerConsensusManageApiRequest.getBrokerConsensus(start, end, params),

    enabled: enable,
  });
};
