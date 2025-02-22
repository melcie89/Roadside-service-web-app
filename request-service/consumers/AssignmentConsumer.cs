using MassTransit;
using shared.Events;

namespace request_service.consumers;

public class AssignmentConsumer : IConsumer<ServiceProviderAssigned>
{
    public async Task Consume(ConsumeContext<ServiceProviderAssigned> context)
    {
        var request = context.Message;
    }
}