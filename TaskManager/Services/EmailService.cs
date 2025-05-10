
using MailKit;
using MailKit.Net.Imap;
using MailKit.Net.Smtp;
using MimeKit;

namespace TaskManager.Services
{
    public class EmailService : IEmailService
    {
        private readonly string _smtpHost;
        private readonly int _smtpPort;
        private readonly string _smtpUser;
        private readonly string _smtpPass;
        private readonly string _fromEmail;
        private readonly string _imapHost;
        private readonly int _imapPort;
        private readonly string _imapUser;
        private readonly string _imapPass;
        public EmailService(IConfiguration configuration)
        {
            _smtpHost = configuration["EmailSettings:SmtpHost"] ?? "smtp.gmail.com";
            _smtpPort = int.Parse(configuration["EmailSettings:SmtpPort"] ?? "587");
            _smtpUser = configuration["EmailSettings:SmtpUser"] ?? "arinaolegowna@gmail.com";
            _smtpPass = configuration["EmailSettings:SmtpPass"] ?? "fsvg sbip bqqj abmz";
            _fromEmail = configuration["EmailSettings:FromEmail"] ?? "arinaolegowna@gmail.com";
            _imapHost = configuration["EmailSettings:ImapHost"] ?? "imap.gmail.com";
            _imapPort = int.Parse(configuration["EmailSettings:ImapPort"] ?? "993");
            _imapUser = configuration["EmailSettings:ImapUser"] ?? "arinaolegowna@gmail.com";
            _imapPass = configuration["EmailSettings:ImapPass"] ?? "fsvg sbip bqqj abmz";
        }
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("TaskManager", _fromEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;
            message.Body = new TextPart("plain") { Text = body };

            using var client = new SmtpClient();
            await client.ConnectAsync(_smtpHost, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUser, _smtpPass);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }

        public async Task<List<string>> CheckNewEmailsAsync()
        {
            var emails = new List<string>();
            using var client = new ImapClient();
            await client.ConnectAsync(_imapHost, _imapPort, MailKit.Security.SecureSocketOptions.SslOnConnect);
            await client.AuthenticateAsync(_imapUser, _imapPass);

            var inbox = client.Inbox;
            await inbox.OpenAsync(FolderAccess.ReadOnly);

            for (int i = inbox.Count - 1; i >= 0 && i >= inbox.Count - 5; i--)
            {
                var message = await inbox.GetMessageAsync(i);
                emails.Add($"From: {message.From}, Subject: {message.Subject}, Body: {message.TextBody}");
            }

            await client.DisconnectAsync(true);
            return emails;
        }
    }

    
}
