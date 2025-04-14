import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import VotingContract from './contracts/Voting.json'

const CONTRACT_ADDRESS = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9' // ← 改成你自己的！

function App() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [contract, setContract] = useState<ethers.Contract | null>(null)
  const [walletAddress, setWalletAddress] = useState<string>('')
  const [candidates, setCandidates] = useState<string[]>([])
  const [votes, setVotes] = useState<Record<string, string>>({})
  const [hasVoted, setHasVoted] = useState<boolean>(false)

  useEffect(() => {
    const init = async () => {
      if (!(window as any).ethereum) {
        alert('请安装 Metamask！')
        return
      }

      const _provider = new ethers.BrowserProvider((window as any).ethereum)
      const _signer = await _provider.getSigner()
      const _contract = new ethers.Contract(CONTRACT_ADDRESS, VotingContract.abi, _signer)

      setProvider(_provider)
      setSigner(_signer)
      setContract(_contract)

      const addr = await _signer.getAddress()
      setWalletAddress(addr)

      const votedStatus = await _contract.hasVoted(addr)
      setHasVoted(votedStatus)

      const cands: string[] = await _contract.getCandidates()
      setCandidates(cands)

      const voteMap: Record<string, string> = {}
      for (let c of cands) {
        const v = await _contract.getVotes(c)
        voteMap[c] = v.toString()
      }
      setVotes(voteMap)
    }

    init()
  }, [])

  const voteFor = async (candidate: string) => {
    if (!contract || hasVoted) return

    try {
      const tx = await contract.vote(candidate)
      await tx.wait()

      alert(`投票成功 ✅`)
      const updated = await contract.getVotes(candidate)
      setVotes(prev => ({ ...prev, [candidate]: updated.toString() }))
      setHasVoted(true)
    } catch (err: any) {
      alert(`投票失败：${err?.reason || err.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">🗳️ 去中心化投票系统</h1>

        <p className="text-sm text-gray-600 break-all mb-4">
          当前钱包地址：<br />
          <span className="text-blue-600">{walletAddress}</span>
        </p>

        {hasVoted && (
          <p className="text-green-600 font-medium mb-4">✅ 你已投过票，感谢参与！</p>
        )}

        <ul className="space-y-4">
          {candidates.map((c, i) => (
            <li
              key={i}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-md"
            >
              <div>
                <p className="font-semibold text-gray-800">{c}</p>
                <p className="text-sm text-gray-500">当前得票：{votes[c] || '0'} 票</p>
              </div>
              <button
                className={`px-4 py-2 text-white rounded ${
                  hasVoted
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={hasVoted}
                onClick={() => voteFor(c)}
              >
                投票
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
