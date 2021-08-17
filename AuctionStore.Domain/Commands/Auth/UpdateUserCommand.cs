using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Exceptions;
using AuctionStore.Infrastructure.Helpers;
using AuctionStore.Infrastructure.Models;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Auth
{
    public class UpdateUserCommand : IRequest<bool>
    {
        public UpdateUserCommand WithUserId(Guid id)
        {
            this.Id = id;
            return this;
        }

        protected Guid Id { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(30)]
        //[RegularExpression(Constants.Alphabetic)]
        public string FirstName { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(30)]
        //[RegularExpression(Constants.Alphabetic)]
        public string LastName { get; set; }

        [MinLength(6)]
        [MaxLength(50)]
        public string Password { get; set; }

        [Required]
        [MaxLength(50)]
        //[RegularExpression(Constants.EmailRegex)]
        public string Email { get; set; }

        public Guid GetUserID => Id;

        public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, bool>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly ILogger<UpdateUserCommand> logger;

            public UpdateUserCommandHandler(DataContext context, IMapper mapper, ILogger<UpdateUserCommand> logger)
            {
                this.context = context;
                this.mapper = mapper;
                this.logger = logger;
            }
            public async Task<bool> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
            {
                var target = await GetUser(request.Id, cancellationToken);

                if(target == null)
                {
                    throw new DomainException((int)DictErrorCodes.UserNotFound,DictErrorCodes.UserNotFound.GetDescription());
                }

                mapper.Map(request, target);

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }

            private async Task<User> GetUser(Guid id, CancellationToken ct)
            {
                return await context.Users.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);
            }
        }
    }
}
