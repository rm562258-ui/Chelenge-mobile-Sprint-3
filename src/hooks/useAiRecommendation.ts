import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import aiService, { type AiRecommendationPayload } from '../services/aiService';

export function useAiRecommendation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: AiRecommendationPayload) =>
            aiService.recommend(payload).then((response) => response.data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['aiHistory'] }),
    });
}

export function useAI() {
    return useQuery({
        queryKey: ['aiHistory'],
        queryFn: () => aiService.list().then((response) => response.data),
    });
}
