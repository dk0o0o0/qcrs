package com.linkus.capital.util.enumtype.common;

import com.linkus.capital.util.enumtype.bill.BillCMISCreditMode;
import com.linkus.capital.util.enumtype.bill.BillFlowStatusMode;
import com.linkus.capital.util.enumtype.bill.BillNoteIOModifyMode;
import com.linkus.capital.util.enumtype.bond.TeamBookOccurDivideMode;
import com.linkus.capital.util.enumtype.bond.TeamLimitMode;

/**
 *
 * <p>Title com.linkus.capital.test.ConstantConfigMode</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年4月20日 下午8:39:27
 * @version 1.0
 * 
 * @modified records:
 */
public class ConstantConfigMode {

	// 授信类型
	private CreditMode creditMode;
	
	// 授权类型
	private PowerMode powerMode;

	// 锁仓类型
	private BookLockMode bookLockMode;

	// 授信恢复步骤
	private CreditRecoverStep creditRecoverStep;

	// 投组限额类型
	private TeamLimitMode teamLimitMode;

	// 待处理金额类型
	private PretreatedMode pretreatedMode;
	
	// 待处理金额类型
	private BookCreateMode bookCreateMode;
	
	private ApprovalMode approvalMode;
	
	
	private FrozenModeForPledge frozenModeForPledge;
	
	// 冻结类型
	private FrozenMode frozenMode;

	// 投组更新模式
	private BookOperMode bookOperMode;

	// 投组持仓发生额切分规则
	private TeamBookOccurDivideMode teamBookOccurDivideMode;
	
	// 票据基础信息更新模式
	private NoteOperMode[] noteOperModes;
	
	private BillCMISCreditMode billCMISCreditMode;
	
	private BillFlowStatusMode billFlowStatusMode;
	
	private BillNoteIOModifyMode billNoteIOModifyMode;

	public BillNoteIOModifyMode getBillNoteIOModifyMode() {
		return billNoteIOModifyMode;
	}

	public void setBillNoteIOModifyMode(BillNoteIOModifyMode billNoteIOModifyMode) {
		this.billNoteIOModifyMode = billNoteIOModifyMode;
	}

	public BillFlowStatusMode getBillFlowStatusMode() {
		return billFlowStatusMode;
	}

	public void setBillFlowStatusMode(BillFlowStatusMode billFlowStatusMode) {
		this.billFlowStatusMode = billFlowStatusMode;
	}

	public CreditMode getCreditMode() {
		return creditMode;
	}

	public void setCreditMode(CreditMode creditMode) {
		this.creditMode = creditMode;
	}

	public PowerMode getPowerMode() {
		return powerMode;
	}

	public void setPowerMode(PowerMode powerMode) {
		this.powerMode = powerMode;
	}

	public BookLockMode getBookLockMode() {
		return bookLockMode;
	}

	public void setBookLockMode(BookLockMode bookLockMode) {
		this.bookLockMode = bookLockMode;
	}

	public CreditRecoverStep getCreditRecoverStep() {
		return creditRecoverStep;
	}

	public void setCreditRecoverStep(CreditRecoverStep creditRecoverStep) {
		this.creditRecoverStep = creditRecoverStep;
	}

	public TeamLimitMode getTeamLimitMode() {
		return teamLimitMode;
	}

	public void setTeamLimitMode(TeamLimitMode teamLimitMode) {
		this.teamLimitMode = teamLimitMode;
	}

	public PretreatedMode getPretreatedMode() {
		return pretreatedMode;
	}

	public void setPretreatedMode(PretreatedMode pretreatedMode) {
		this.pretreatedMode = pretreatedMode;
	}

	public FrozenMode getFrozenMode() {
		return frozenMode;
	}

	public void setFrozenMode(FrozenMode frozenMode) {
		this.frozenMode = frozenMode;
	}

	public BookOperMode getBookOperMode() {
		return bookOperMode;
	}

	public void setBookOperMode(BookOperMode bookOperMode) {
		this.bookOperMode = bookOperMode;
	}

	public TeamBookOccurDivideMode getTeamBookOccurDivideMode() {
		return teamBookOccurDivideMode;
	}

	public void setTeamBookOccurDivideMode(TeamBookOccurDivideMode teamBookOccurDivideMode) {
		this.teamBookOccurDivideMode = teamBookOccurDivideMode;
	}

	public NoteOperMode[] getNoteOperModes() {
		return noteOperModes;
	}

	public void setNoteOperModes(NoteOperMode[] noteOperModes) {
		this.noteOperModes = noteOperModes;
	}
	
	public BookCreateMode getBookCreateMode() {
		return bookCreateMode;
	}

	public void setBookCreateMode(BookCreateMode bookCreateMode) {
		this.bookCreateMode = bookCreateMode;
	}
	
	public ApprovalMode getApprovalMode() {
		return approvalMode;
	}

	public void setApprovalMode(ApprovalMode approvalMode) {
		this.approvalMode = approvalMode;
	}
	
	public FrozenModeForPledge getFrozenModeForPledge() {
		return frozenModeForPledge;
	}

	public void setFrozenModeForPledge(FrozenModeForPledge frozenModeForPledge) {
		this.frozenModeForPledge = frozenModeForPledge;
	}

	public BillCMISCreditMode getBillCMISCreditMode() {
		return billCMISCreditMode;
	}

	public void setBillCMISCreditMode(BillCMISCreditMode billCMISCreditMode) {
		this.billCMISCreditMode = billCMISCreditMode;
	}
}
