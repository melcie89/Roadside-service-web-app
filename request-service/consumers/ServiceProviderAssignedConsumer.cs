using MassTransit;
using request_service.Services;
using Shared.Events;

namespace request_service.consumers;

public class ServiceProviderAssignedConsumer(IRequestService requestService) : IConsumer<ServiceProviderAssigned>
{
    public async Task Consume(ConsumeContext<ServiceProviderAssigned> context)
    {
        var assigned = context.Message;
        await requestService.UpdateRequestStatusAsync(assigned.RequesterId, assigned.ServiceProviderId);
    }
}