using MassTransit;
using service_provider_dispatcher_service.services;
using Shared.Events;

namespace service_provider_dispatcher_service.consumers;

public class ServiceRequestedConsumer(ServiceDispatcher serviceDispatcher) : IConsumer<RequestCreated>
{
    public async Task Consume(ConsumeContext<RequestCreated> context)
    {
        var request = context.Message;

        await serviceDispatcher.AssignServiceProviderAsync(request);
    }
}