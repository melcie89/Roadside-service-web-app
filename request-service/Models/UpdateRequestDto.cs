namespace request_service.Models;

public class UpdateRequestDto : CreateRequestDto
{
    public Guid Id { get; set; }
}