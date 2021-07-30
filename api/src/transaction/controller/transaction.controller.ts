import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt.auth.guard';
import { TransactionDto } from '../model/transaction.dto';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction.interface';
import { TransactionService } from '../service/transaction.service';
import { PaginationDto } from '../model/PaginationDto';
import {PaginatedTransactionResultDto} from '../model/PaginatedTransactionResult';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  index(
    @Query() paginationDto: PaginationDto,
    @Request() req,
  ): Promise<PaginatedTransactionResultDto> {
    const user = req.user;
    return this.transactionService.usersPaginatedTransactions(user, {
      ...paginationDto,
      limit: paginationDto.limit > 10 ? 10 : paginationDto.limit,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Post('add')
  create(
    @Body() transaction: TransactionDto,
    @Request() req,
  ): Observable<Transaction> {
    const owner = req.user;
    return this.transactionService.create(owner, transaction);
  }

}
