using AuctionStore.Infrastructure.DataContext;
using AuctionStore.Infrastructure.Services.Auth;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Auth
{
    public class UserLoginCommand : IRequest<bool>
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public class UserLoginCommandHandler : IRequestHandler<UserLoginCommand, bool>
        {
            private readonly DataContext ctx;
            private readonly IAuthService authService;
            private readonly IMapper mapper;

            public UserLoginCommandHandler(DataContext ctx, IAuthService authService, IMapper mapper)
            {
                this.ctx = ctx;
                this.authService = authService;
                this.mapper = mapper;
            }

            async Task<bool> IRequestHandler<UserLoginCommand, bool>.Handle(UserLoginCommand request, CancellationToken cancellationToken)
            {
               
            }
        }
    }
}
