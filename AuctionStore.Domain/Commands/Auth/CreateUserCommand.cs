using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Models;
using AuctionStore.Infrastructure.Services.Auth;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Auth
{
    public class CreateUserCommand : IRequest<bool>
    {
        protected Guid Id { get; private set; }

        //[Required]
        [MinLength(2)]
        [MaxLength(30)]
        //[RegularExpression(Constants.Alphabetic)]

        public string UserName { get; set; }

        //[Required]
        [MinLength(2)]
        [MaxLength(30)]
        //[RegularExpression(Constants.Alphabetic)]
        public string FirstName { get; set; }

        //[Required]
        [MinLength(2)]
        [MaxLength(30)]
        //[RegularExpression(Constants.Alphabetic)]
        public string LastName { get; set; }

        //[Required]
        [MinLength(6)]
        [MaxLength(50)]
        //[RegularExpression(Constants.Password)]
        public string Password { get; set; }


        //[Required]
        [MaxLength(50)]
        //[RegularExpression(Constants.EmailRegex)]
        public string Email { get; set; }

        public bool IsDisabled { get; set; }
        public string UserType { get; set; }

        public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, bool>
        {
            private readonly DataContext context;
            private readonly IAuthService authService;
            private readonly IMapper mapper;
            private readonly ILogger<CreateUserCommand> logger;

            public CreateUserCommandHandler(DataContext context, IAuthService authService, IMapper mapper, ILogger<CreateUserCommand> logger)
            {
                this.context = context;
                this.authService = authService;
                this.mapper = mapper;
                this.logger = logger;
            }

            public async Task<bool> Handle(CreateUserCommand request, CancellationToken cancellationToken)
            {
                var user = await SetUpUser(request, cancellationToken);

                await context.Users.AddAsync(user, cancellationToken);
                await context.SaveChangesAsync(cancellationToken);

                return true;
            }

            private async Task<User> SetUpUser(CreateUserCommand request, CancellationToken ct)
            {
                var target = new User();

                mapper.Map(request, target);

                target.PasswordHash = authService.CreatePasswordHash(request.Password);
                await AssignRole(request, target, ct);

                return target;
            }

            private async Task AssignRole(CreateUserCommand request, User target, CancellationToken ct)
            {
                var dbRole = await context.Roles.FirstOrDefaultAsync(x => x.Name == request.UserType, ct);

                target.UserRoles = new UserRoles
                {
                    UserId = target.Id,
                    RoleId = dbRole.Id
                };

            }
        }
    }
}
