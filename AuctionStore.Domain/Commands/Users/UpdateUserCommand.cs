using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Exceptions;
using AuctionStore.Infrastructure.Models;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.ModelDtos;

namespace AuctionStore.Domain.Commands.Users
{
    public class UpdateUserCommand : IRequest<UserDto>
    {

        public Guid UserId { get; set; }

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
        

        [Required]
        [MaxLength(50)]
        //[RegularExpression(Constants.EmailRegex)]
        public string Email { get; set; }


        public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, UserDto>
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
            public async Task<UserDto> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
            {
                var target = await GetUser(request.UserId, cancellationToken);

                if(target == null)
                {
                    throw new DomainException((int)DictErrorCodes.UserNotFound,DictErrorCodes.UserNotFound.GetDescription());
                }

                target.LastName = request.LastName;
                target.FirstName = request.FirstName;
                target.Email = request.Email;

                await context.SaveChangesAsync(cancellationToken);

                return mapper.Map<UserDto>(target);
            }

            private async Task<User> GetUser(Guid id, CancellationToken ct)
            {
                return await context.Users.FirstOrDefaultAsync(x => x.Id == id && !x.IsDeleted, ct);
            }
        }
    }
}
