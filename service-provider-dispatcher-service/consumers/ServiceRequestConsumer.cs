using MassTransit;
using service_provider_dispatcher_service.data;
using service_provider_dispatcher_service.services;
using shared.Events;

namespace service_provider_dispatcher_service.consumers;

public class ServiceRequestConsumer : IConsumer<RequestCreated>
{
    private ServiceDispatcher _serviceDispatcher;
    private IPublishEndpoint _publishEndpoint;

    public ServiceRequestConsumer(ServiceDispatcher dispatcher, IPublishEndpoint publishEndpoint, ServiceDispatcher serviceDispatcher)
    {
        _publishEndpoint = publishEndpoint;
        _serviceDispatcher = serviceDispatcher;
    }

    public async Task Consume(ConsumeContext<RequestCreated> context)
    {
        var request = context.Message;

        Console.WriteLine("=========== A1 ============");

        await _serviceDispatcher.AssignServiceProviderAsync(request);
    }
}