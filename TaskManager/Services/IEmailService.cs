using System.Collections.Generic;

namespace TaskManager.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string body); 
        Task<List<string>> CheckNewEmailsAsync();
    }
}
